import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRequest';
import { tripService } from './trip.service';
import picker from '../../utils/picker';
import { tripFilterableFields } from './trip.constant';
import { ITripFilterRequest } from './trip.interface';
import { IPaginationOptions } from '../../utils/pagination';

const createTripController = catchAsync(async (req, res) => {
  const payload = req.body;
  const { id } = req.user;

  const result = await tripService.createTripDB(id, payload);

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Trip created successfully',
    data: result,
  });
});

const getAllTripController = catchAsync(async (req, res) => {
  const filters = picker(req.query, tripFilterableFields);
  const options = picker(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await tripService.getAllTripFromDB(filters, options);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Condition retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSignelTripController = catchAsync(async (req, res) => {
  const { tripId } = req.params;
  const result = await tripService.getSingleTrip(tripId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Single Trip retrieved successfully',
    data: result,
  });
});

const getAllRequestTrips = catchAsync(async (req, res) => {
  const { userId } = req.params;

  console.log(userId);
  const filters: ITripFilterRequest = req.query;
  const options: IPaginationOptions = {
    limit: parseInt(req.query.limit as string, 10) || 10,
    page: parseInt(req.query.page as string, 10) || 1,
    sortBy: req.query.sortBy as string,
    sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'asc',
  };

  const result = await tripService.getAllRequestTripFromDB(
    filters,
    options,
    userId,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Trip retrieved successfully',
    data: result,
  });
});

export const tripController = {
  createTripController,
  getAllTripController,
  getSignelTripController,
  getAllRequestTrips,
};
