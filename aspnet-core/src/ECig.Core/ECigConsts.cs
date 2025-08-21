using ECig.Debugging;

namespace ECig
{
    public class ECigConsts
    {
        public const string LocalizationSourceName = "ECig";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "3d331f9217e24b27a1497c7ca6fda242";
    }
}
