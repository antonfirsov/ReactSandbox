using System;
using System.Collections.Generic;
using System.Linq;
using ChartSandbox.Model;
using Xunit;

namespace ChartTests
{
    public class CurrencyCodeTests
    {
        [Theory]
        [InlineData("eur")]
        [InlineData("EuR")]
        [InlineData("foo")]
        public void Constructor_ShouldCreateUpperCaseCode(string codeValue)
        {
            CurrencyCode c = new CurrencyCode(codeValue);

            Assert.Equal(codeValue.ToUpper(), c.Value);
        }

        [Theory]
        [InlineData("ab")]
        [InlineData("1234")]
        [InlineData("Arnold Schwarzenegger")]
        public void Constructor_ThrowsWhenCodeLengthIsNot3(string codeValue)
        {
            Assert.ThrowsAny<ArgumentException>(() => new CurrencyCode(codeValue));
        }

        [Theory]
        [InlineData("FOO", "FOO")]
        [InlineData("eur", "EUR")]
        public void Equality_WhenTrue(string c1, string c2)
        {
            CurrencyCode code1 = c1;
            CurrencyCode code2 = c2;

            Assert.Equal(code1, code2);
            Assert.Equal(code1.GetHashCode(), code2.GetHashCode());
        }

        [Theory]
        [InlineData("asd", "foo")]
        public void Equality_WhenFalse(string c1, string c2)
        {
            CurrencyCode code1 = c1;
            CurrencyCode code2 = c2;

            Assert.NotEqual(code1, code2);
        }
    }

    public class CurrencyRatesSnapshotTests
    {  
        [Fact]
        public void Constructor()
        {
            CurrencyRate[] testRates =
            {
                new CurrencyRate("HUF", 400),
                new CurrencyRate("USD", 0.8),
                new CurrencyRate("JPY", 133),
            };

            DateTime date = new DateTime(2018, 05, 20);

            CurrencyRatesSnapshot snapshot = new CurrencyRatesSnapshot(date, testRates);

            Assert.Equal(date, snapshot.Date);
            AssertSetEquals(testRates.Select(r => r.Code), snapshot.Select(r => r.Code));
            Assert.Equal(400, snapshot["HUF"].Rate);
        }

        private static void AssertSetEquals<T>(IEnumerable<T> a, IEnumerable<T> b)
        {
            Assert.True(new HashSet<T>(a).SetEquals(b));
        }
    }
}