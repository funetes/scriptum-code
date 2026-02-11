export class AppError extends Error {
  public code: string;
  public statusCode: number;

  constructor(
    message: string,
    code: string = "INTERNAL_ERROR",
    statusCode: number = 500,
  ) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.statusCode = statusCode;
  }
}

export class ApiError extends AppError {
  constructor(
    message: string,
    code: string = "API_ERROR",
    statusCode: number = 500,
  ) {
    super(message, code, statusCode);
    this.name = "ApiError";
  }
}

export class AuthError extends AppError {
  constructor(message: string, code: string = "AUTH_ERROR") {
    super(message, code, 401);
    this.name = "AuthError";
  }
}

export const mapFirebaseError = (error: any): AppError => {
  const code = error?.code || "unknown";
  const message = error?.message || "An unexpected error occurred";

  switch (code) {
    case "permission-denied":
      return new ApiError("권한이 없습니다.", "PERMISSION_DENIED", 403);
    case "not-found":
      return new ApiError("데이터를 찾을 수 없습니다.", "NOT_FOUND", 404);
    case "auth/user-not-found":
    case "auth/wrong-password":
      return new AuthError("이메일 또는 비밀번호가 잘못되었습니다.");
    case "auth/network-request-failed":
      return new ApiError(
        "네트워크 연결이 지연되고 있습니다.",
        "NETWORK_ERROR",
        503,
      );
    default:
      return new AppError(message, code.toUpperCase());
  }
};
