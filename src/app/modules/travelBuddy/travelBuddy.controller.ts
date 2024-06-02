import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRequest';
import { travelBuddyService } from './travelBuddy.service';

const createTravelBuddyController = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await travelBuddyService.createTravelBuddyDB(payload);

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Travel buddy request sent successfully',
    data: result,
  });
});

const getTravelBuddyController = catchAsync(async (req, res) => {
  const { tripId } = req.params;

  const result = await travelBuddyService.getTravelBuddyDb(tripId);

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Potential travel buddies retrieved successfully',
    data: result,
  });
});

const updateStatusTravelBuddyController = catchAsync(async (req, res) => {
  const { buddyId } = req.params;
  const { tripId, status } = req.body;

  const result = await travelBuddyService.UpdateStatusTravelBuddyDB(
    tripId,
    buddyId,
    status,
  );

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Travel buddy request responded successfully',
    data: result,
  });
});

export const travelBuddyController = {
  createTravelBuddyController,
  getTravelBuddyController,
  updateStatusTravelBuddyController,
};
