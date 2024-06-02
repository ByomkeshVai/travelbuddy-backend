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
    // Check if the user exists
    const userExists = await UserModel.isUserExistsById(id);
    if (!userExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'This User does not exist');
    }

    // Create a new trip
    const result = await prisma.trip.create({
      data: {
        ...payload,
        userId: id,
        photos: payload.photos,
      },
    });

    // Format the result
    const formattedResult = {
      id: result.id,
      userId: result.userId,
      destination: result.destination,
      startDate: result.startDate,
      endDate: result.endDate,
      budget: result.budget,
      description: result.description,
      photos: result.photos,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };

    return formattedResult;
  } catch (error: any) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error?.message || 'An error occurred while creating the trip',
    );
  }
};

const getAllTripFromDB = async (
  filters: ITripFilterRequest,
  options: IPaginationOptions,
) => {
  try {
    const { limit, page, skip } =
      paginationHelpers.calculatePagination(options);
    const { destination, startDate, endDate, type, description, searchTerm } =
      filters;
    const { minBudget, maxBudget } = filters;

    const andConditions: Prisma.TripWhereInput[] = [];

    // Add filters based on query parameters
    if (destination) {
      andConditions.push({ destination: { contains: destination } });
    }
    // Add filters based on query parameters
    if (description) {
      andConditions.push({ description: { contains: description } });
    }
    if (type) {
      andConditions.push({ type: { contains: type } });
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

const getSingleTrip = async (tripId: string) => {
  const tripExists = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  });

  if (!tripExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This Trip does not exist');
  }

  return tripExists;
};

export const tripService = {
  createTripDB,
  getAllTripFromDB,
  getSingleTrip,
};
