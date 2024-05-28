import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import UserModel from '../user/user.model';
import { ITripFilterRequest, TTrip } from './trip.interface';
import prisma from '../../../DB/db.config';
import { IPaginationOptions } from '../../utils/pagination';
import { paginationHelpers } from '../../helpers/paginationHelper';
import { tripSearchableFields } from './trip.constant';
import { Prisma } from '@prisma/client';

const createTripDB = async (id: string, payload: TTrip) => {
  try {
    const userExists = await UserModel.isUserExistsById(id);
    if (!userExists) {
      throw new AppError(httpStatus.BAD_REQUEST, 'This User does not exist');
    }

    const result = await prisma.trip.create({
      data: {
        ...payload,
        userId: id,
      },
    });

    const formattedResult = {
      id: result.id,
      userId: result.userId,
      destination: result.destination,
      startDate: result.startDate,
      endDate: result.endDate,
      budget: result.budget,
      description: result.description,
      images: result.images, // Assuming 'images' field exists in the result
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };

    return formattedResult;
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error?.message);
  }
};

const getAllTripFromDB = async (
  filters: ITripFilterRequest,
  options: IPaginationOptions,
) => {
  try {
    const { limit, page, skip } =
      paginationHelpers.calculatePagination(options);
    const { destination, startDate, endDate, searchTerm } = filters;
    const { minBudget, maxBudget } = filters;

    const andConditions: Prisma.TripWhereInput[] = [];

    // Add filters based on query parameters
    if (destination) {
      andConditions.push({ destination: { contains: destination } });
    }
    if (startDate) {
      andConditions.push({ startDate: { gte: startDate } });
    }
    if (endDate) {
      andConditions.push({ endDate: { lte: endDate } });
    }
    if (minBudget !== undefined && maxBudget !== undefined) {
      andConditions.push({
        budget: {
          gte: minBudget,
          lte: maxBudget,
        },
      });
    }
    if (searchTerm) {
      andConditions.push({
        OR: tripSearchableFields.map((field) => ({
          [field]: { contains: searchTerm, mode: 'insensitive' },
        })),
      });
    }

    const whereConditions: Prisma.TripWhereInput =
      andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.trip.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy: options.sortBy
        ? { [options.sortBy]: options.sortOrder || 'asc' }
        : undefined,
    });

    const total = await prisma.trip.count({ where: whereConditions });

    return {
      meta: { total, page, limit },
      data: result,
    };
  } catch (error: any) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to get all Trip',
      error,
    );
  }
};

export const tripService = {
  createTripDB,
  getAllTripFromDB,
};
