using System.Threading.Tasks;

namespace ChartSandbox.Model
{
    public class CurrencyRate
    {
        public CurrencyRate(CurrencyCode code, double rate)
        {
            Code = code;
            Rate = rate;
        }

        public CurrencyCode Code { get; }

        /// <summary>
        /// Eur / *
        /// </summary>
        public double Rate { get; }
    }
    
    public class CurrencyTimeSerie
    {
        
    }
}
