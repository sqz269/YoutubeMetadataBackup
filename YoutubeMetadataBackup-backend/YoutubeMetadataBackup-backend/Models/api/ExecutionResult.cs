namespace YoutubeMetadataBackup_backend.Models.api
{
    public enum ErrorCode
    {
        Success,

        InvalidParamaters
    }

    public class ExecutionResult<T>
    {
        public bool Error { get; set; }
        public ErrorCode ErrorCode { get; set; }
        public string ErrorMessage { get; set; }
        public T Response { get; set; }

        public static ExecutionResult<T> Success(T result)
        {
            return new ExecutionResult<T>
            {
                Error = false, ErrorCode = ErrorCode.Success, ErrorMessage = "Operation Completed Successfully",
                Response = result
            };
        }

        public static ExecutionResult<T> Fail(ErrorCode errorCode, string message)
        {
            return new ExecutionResult<T>
            {
                Error = true,
                ErrorCode = errorCode,
                ErrorMessage = message,
                Response = default
            };
        }
    }
}