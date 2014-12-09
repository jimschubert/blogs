using System.Data;

namespace SolidExample
{
    /// <summary>
    /// Wraps an IDataRecord record to provide a consistent indexer interface
    /// </summary>
    internal class DataRecordStringIndexedWrapper : IStringIndexed
    {
        private readonly IDataRecord _record;

        /// <summary>
        /// Initializes a new instance of <see cref="DataRecordStringIndexedWrapper"/>
        /// </summary>
        /// <param name="record">A record</param>
        public DataRecordStringIndexedWrapper(IDataRecord record)
        {
            _record = record;
        }

        #region IStringIndexed Members

        /// <inheritdoc/>
        object IStringIndexed.this[string key]
        {
            get { return _record[key]; }
        }

        #endregion
    }
}