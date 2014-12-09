using System.Data;

namespace SolidExample
{
    /// <summary>
    /// Wraps a DataRow record to provide a consistent indexer interface
    /// </summary>
    internal class DataRowStringIndexedWrapper : IStringIndexed
    {
        private readonly DataRow _row;

        /// <summary>
        /// Initializes a new instance of <see cref="DataRowStringIndexedWrapper"/>
        /// </summary>
        /// <param name="row"></param>
        public DataRowStringIndexedWrapper(DataRow row)
        {
            _row = row;
        }

        #region IStringIndexed Members

        /// <inheritdoc/>
        object IStringIndexed.this[string key]
        {
            get { return _row[key]; }
        }

        #endregion
    }
}