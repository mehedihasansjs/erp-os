import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, throwError } from 'rxjs';
import { LoggerService } from '../services';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const logger = inject(LoggerService);

  return next(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        const original = error;
        const transformed = new Error(original.message, {
          cause: `HTTP ${original.status} - ${original.statusText} @${original.url}`,
        });

        switch (original.status) {
          case 0:
            transformed.message = `Network error. Please check your internet connection.`;
            break;
          
          case HttpStatusCode.NotFound:
            transformed.message = `Resource not found. May be the URL is incorrect or the resource has been removed or the resource is not created yet.`;
            break;

          case HttpStatusCode.InternalServerError:
            transformed.message = `Internal server error. Please try again later. If the problem persists, please contact the administrator with error code: ${original.status}. But before that, let me guess the error. Is it ${(original as any)['publicMessage'] || (original.error as any)['publicMessage']}?`;
            break;

          case HttpStatusCode.BadRequest:
            transformed.message = `Bad request. The request is invalid. Please check the request and try again. Issue is most probably the value you entered or something to do with this application. If the problem persists, please contact the administrator with error code: ${original.status}.`;
            break;

          case HttpStatusCode.Unauthorized:
            transformed.message = `Unauthorized. You are not authorized to access this resource. Please login with valid credentials and try again. If the problem persists, please contact the administrator with error code: ${original.status}. Most probably, you are not logged in or your session has expired.`;
            break;

          case HttpStatusCode.Forbidden:
            transformed.message = `Forbidden. You are not allowed to access this resource. Please contact the administrator with error code: ${original.status}. Most probably, no permission is given to you or it's being removed.`;
            break;

          case HttpStatusCode.PaymentRequired:
            transformed.message = `To access this resource, you need to pay first.`;
            break;

          case HttpStatusCode.MethodNotAllowed:
            transformed.message = `Method not allowed. The method you are using to access this resource is not allowed. Please contact the administrator with error code: ${original.status} to resolve this issue. Need upgration of application version.`;
            break;

          case HttpStatusCode.NotAcceptable:
            transformed.message = `Not acceptable. The resource is not acceptable in the current state. Please contact the administrator with error code: ${original.status} to resolve this issue.`;
            break;

          case HttpStatusCode.ProxyAuthenticationRequired:
            transformed.message = `Proxy authentication required. Please contact the administrator with error code: ${original.status} to resolve this issue.`;
            break;

          case HttpStatusCode.RequestTimeout:
            transformed.message = `Request timeout. The request took too long to process. Either issue with you VPN/ISP or need to try after sometime. Please try again later. If the problem persists, please contact the administrator with error code: ${original.status}.`;
            break;

          case HttpStatusCode.Conflict:
            transformed.message = `Conflict. The request could not be completed due to a conflict with the current state of the target resource. Please contact the administrator with error code: ${original.status}.`;
            break;

          case HttpStatusCode.Gone:
            transformed.message = `Gone. The requested resource is no longer available and will not be available again. Please contact the administrator with error code: ${original.status}.`;
            break;

          case HttpStatusCode.LengthRequired:
            transformed.message = `Length required. The request did not specify the length of its content, which is required by the requested resource. Please contact the administrator with error code: ${original.status}.`;
            break;

          case HttpStatusCode.PreconditionFailed:
            transformed.message = `Precondition failed. The server does not meet one of the preconditions that the requester put on the request. Please contact the administrator with error code: ${original.status}.`;
            break;

          case HttpStatusCode.PayloadTooLarge:
            transformed.message = `Request entity too large. The request is larger than the server is willing or able to process. Upload smaller content/file or please contact the administrator with error code: ${original.status}.`;
            break;

          case HttpStatusCode.UriTooLong:
            transformed.message = `Request-URI too long. The URI provided was too long for the server to process. Please contact the administrator with error code: ${original.status}.`;
            break;

          case HttpStatusCode.UnsupportedMediaType:
            transformed.message = `Unsupported media type. The request entity has a media type which the server or resource does not support. Please contact the administrator with error code: ${original.status}.`;
            break;

          case HttpStatusCode.TooManyRequests:
            transformed.message = `Too many requests have sent in a given amount of time. Please be patient and try again later. You are not robot, right?`;
            break;

          case HttpStatusCode.RequestHeaderFieldsTooLarge:
            transformed.message = `Request header fields too large. The server is unwilling to process the request because its header fields are too large. Please contact the administrator with error code: ${original.status}.`;
            break;

          case HttpStatusCode.NotImplemented:
            transformed.message = `This feature is not implemented yet. May be expecting in future release. Please contact the administrator with error code: ${original.status}.`;
            break;

          case HttpStatusCode.BadGateway:
            transformed.message = `Bad gateway. The server was acting as a gateway or proxy and received an invalid response from the upstream server. Please contact the administrator with error code: ${original.status}.`;
            break;

          case HttpStatusCode.ServiceUnavailable:
            transformed.message = `Service unavailable. The server is currently unavailable. Please try again later. If the problem persists, please contact the administrator with error code: ${original.status}.`;
            break;

          case HttpStatusCode.GatewayTimeout:
            transformed.message = `Gateway timeout. The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server. Please contact the administrator with error code: ${original.status}.`;
            break;

          case HttpStatusCode.HttpVersionNotSupported:
            transformed.message = `HTTP version not supported. The server does not support the HTTP protocol version used in the request. Please contact the administrator with error code: ${original.status}.`;
            break;

          default:
            transformed.message = `An error occurred. Please try again later. If the problem persists, please contact the administrator with error code: ${original.status}.`;
            break;
        }

        logger.error('errorInterceptor', {
          original,
          transformed,
        });

        return throwError(() => of(transformed));
      })
    );
};
