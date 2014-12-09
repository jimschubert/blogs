namespace SolidExample
{
    /// <summary>
    /// A contract for instances that offer objects via keyed index
    /// </summary>
    public interface IStringIndexed
    {
        /// <summary>
        /// An indexer by key
        /// </summary>
        /// <param name="key">A unique string-based key for accessing objects</param>
        /// <returns>A found object at given <param name="key"></param></returns>
        object this[string key] { get; }
    }
}