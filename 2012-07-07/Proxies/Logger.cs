using System;
using System.IO;

namespace Proxies
{
	public interface ILogger {
		void Write(string msg);
	}

	/// <summary>
	/// Logger. This class represents a simple wrapper object.
	/// <para>
	/// Logger proxies calls to TextWriter.WriteLine via the Write method, 
	/// but Logger is technically *not* a proxy object because it is not a TextWriter.
	/// </para>		
	/// <remarks>Requires a TextWriter instance to write to</remarks>
	/// </summary>
	public class Logger : ILogger
	{
		public TextWriter Writer {
			get;
			set;
		}

		public Logger(TextWriter writer) {
			Writer = writer;
		}

		public virtual void Write(string msg) {
			Writer.WriteLine(msg);
		}
	}
}
