"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require('aws-sdk');
AWS.config.region = process.env.AWS_REGION || 'us-east-1';
exports.handler = async (event, context) => {
    console.log(event);
    // Create the DynamoDB service object
    var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
    const secondsSinceEpoch = Math.round(Date.now() / 1000);
    const expirationTime = '' + (secondsSinceEpoch + 60);
    var params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            'RequestID': { S: Math.random().toString(36).substring(2) + Date.now().toString(36) },
            'SiteUrl': { S: event.detail.siteUrl },
            'ErrorType': { S: event.detail.errorType },
            'ExpirationTime': { N: expirationTime }
        }
    };
    // Call DynamoDB to add the item to the table
    let result = await ddb.putItem(params).promise();
    console.log(result);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFtYmRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGFtYmRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0FBQzlCLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLFdBQVcsQ0FBQTtBQUd6RCxPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssRUFBRSxLQUFTLEVBQUUsT0FBVyxFQUFFLEVBQUU7SUFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUVsQixxQ0FBcUM7SUFDckMsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUMsVUFBVSxFQUFFLFlBQVksRUFBQyxDQUFDLENBQUM7SUFFdkQsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUN4RCxNQUFNLGNBQWMsR0FBRyxFQUFFLEdBQUMsQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUVuRCxJQUFJLE1BQU0sR0FBRztRQUNYLFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVU7UUFDakMsSUFBSSxFQUFFO1lBQ0osV0FBVyxFQUFHLEVBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUM7WUFDcEYsU0FBUyxFQUFHLEVBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDO1lBQ3JDLFdBQVcsRUFBRSxFQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBQztZQUN4QyxnQkFBZ0IsRUFBRSxFQUFDLENBQUMsRUFBRSxjQUFjLEVBQUM7U0FDdEM7S0FDRixDQUFDO0lBRUYsNkNBQTZDO0lBQzdDLElBQUksTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqRCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RCLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEFXUyA9IHJlcXVpcmUoJ2F3cy1zZGsnKVxyXG5BV1MuY29uZmlnLnJlZ2lvbiA9IHByb2Nlc3MuZW52LkFXU19SRUdJT04gfHwgJ3VzLWVhc3QtMSdcclxuZXhwb3J0IHt9O1xyXG5cclxuZXhwb3J0cy5oYW5kbGVyID0gYXN5bmMgKGV2ZW50OmFueSwgY29udGV4dDphbnkpID0+IHtcclxuICBjb25zb2xlLmxvZyhldmVudCkgXHJcbiAgXHJcbiAgLy8gQ3JlYXRlIHRoZSBEeW5hbW9EQiBzZXJ2aWNlIG9iamVjdFxyXG4gIHZhciBkZGIgPSBuZXcgQVdTLkR5bmFtb0RCKHthcGlWZXJzaW9uOiAnMjAxMi0wOC0xMCd9KTtcclxuICBcclxuICBjb25zdCBzZWNvbmRzU2luY2VFcG9jaCA9IE1hdGgucm91bmQoRGF0ZS5ub3coKSAvIDEwMDApO1xyXG4gIGNvbnN0IGV4cGlyYXRpb25UaW1lID0gJycrKHNlY29uZHNTaW5jZUVwb2NoICsgNjApO1xyXG4gIFxyXG4gIHZhciBwYXJhbXMgPSB7XHJcbiAgICBUYWJsZU5hbWU6IHByb2Nlc3MuZW52LlRBQkxFX05BTUUsXHJcbiAgICBJdGVtOiB7XHJcbiAgICAgICdSZXF1ZXN0SUQnIDoge1M6IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygyKSArIERhdGUubm93KCkudG9TdHJpbmcoMzYpfSxcclxuICAgICAgJ1NpdGVVcmwnIDoge1M6IGV2ZW50LmRldGFpbC5zaXRlVXJsfSxcclxuICAgICAgJ0Vycm9yVHlwZSc6IHtTOiBldmVudC5kZXRhaWwuZXJyb3JUeXBlfSxcclxuICAgICAgJ0V4cGlyYXRpb25UaW1lJzoge046IGV4cGlyYXRpb25UaW1lfVxyXG4gICAgfVxyXG4gIH07XHJcbiAgXHJcbiAgLy8gQ2FsbCBEeW5hbW9EQiB0byBhZGQgdGhlIGl0ZW0gdG8gdGhlIHRhYmxlXHJcbiAgbGV0IHJlc3VsdCA9IGF3YWl0IGRkYi5wdXRJdGVtKHBhcmFtcykucHJvbWlzZSgpO1xyXG4gIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbn1cclxuIl19