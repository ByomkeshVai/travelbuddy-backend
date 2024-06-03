import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import UserModel from '../user/user.model';
import prisma from '../../../DB/db.config';
import { Status } from '../../interface/common';
import { TravelBuddyRequest } from './travelBuddy.interface';

const createTravelBuddyDB = async (payload: TravelBuddyRequest) => {
  const { tripId, userId } = payload;

  try {
    const tripExists = await prisma.trip.findUnique({
      where: {
        id: tripId,
      },
    });

    if (!tripExists) {
      throw new AppError(httpStatus.BAD_REQUEST, 'This Trip does not exist');
    }

    // Check if user already exists
    const userExists = await UserModel.isUserExistsById(userId);
    if (!userExists) {
      throw new AppError(httpStatus.BAD_REQUEST, 'This User does not exist');
    }

    const result = await prisma.travelBuddyRequest.create({
      data: {
        user: {
          connect: { id: userId },
        },
        trip: {
          connect: { id: tripId },
        },
        status: 'PENDING',
      },
    });

    return result;
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error?.message);
  }
};

const getTravelBuddyDb = async (tripId: string) => {
  const tripExists = await prisma.travelBuddyRequest.findMany({
    where: {
      tripId: tripId,
    },
    include: {
      user: {
        select: {
          username: true,
          email: true,
        },
      },
    },
  });

  if (!tripExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Your Potential Travel Buddy does not exist',
    );
  }

  return tripExists;
};

const UpdateStatusTravelBuddyDB = async (
  tripId: string,
  buddyId: string,
  status: Status,
) => {
  try {
    const tripExists = await prisma.trip.findUnique({
      where: {
        id: tripId,
      },
    });

    if (!tripExists) {
      throw new AppError(httpStatus.BAD_REQUEST, 'This Trip does not exist');
    }

    const buddyExists = await prisma.travelBuddyRequest.findUnique({
      where: {
        id: buddyId,
      },
    });

    if (!buddyExists) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'This Travel Buddy does not exist',
      );
    }

    const result = await prisma.travelBuddyRequest.update({
      where: {
        id: buddyId,
      },
      data: {
        status,
      },
    });

    return result;
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error?.message);
  }
};

export const travelBuddyService = {
  createTravelBuddyDB,
  getTravelBuddyDb,
  UpdateStatusTravelBuddyDB,
};
