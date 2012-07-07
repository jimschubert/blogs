using System;
using System.IO;

namespace Proxies
{
	public interface IFoo: ILogger {
		ILogger Logger {get;set;}
		string ShowBar();
	}

	/// <summary>
	/// Foo. This class represents a simple proxy object using DI.
	/// <remarks>Requries ILogger instance</remarks>
	/// </summary>
	public class Foo : IFoo
	{
		public ILogger Logger {
			get;
			set;
		}

		public Foo() { }
		public Foo (ILogger logger)
		{
			Logger = logger;
		}

		public virtual void Write(string msg) {
			Logger.Write(msg);
		}

		public string ShowBar() {
			return "Bar";
		}
		
		public string ShowBaz() {
			return "Baz";
		}
	}
}

