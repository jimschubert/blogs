using System;
using System.IO;

namespace Proxies
{
	/// <summary>
	/// Concrete foo proxy. This is interface-based proxying. 
	/// i.e. FooInterfaceProxy "is a" Foo and proxies Foo.Write by overriding the virtual method Write.
	/// </summary>
	public class FooInterfaceProxy : IFoo {
		private IFoo _foo;

		public ILogger Logger {
			get;
			set;
		}

		public FooInterfaceProxy(ILogger logger)
		{
			Logger = logger;
		}

		public void Write (string msg)
		{
			Logger.Write("Trace: FooInterfaceProxy.Write enter.");
			if(_foo == null) {
				Logger.Write("Trace: Creating new Foo");
				_foo = new Foo(Logger);
			}
			_foo.Write(msg);
			Logger.Write("Trace: FooInterfaceProxy.Write exit.\n");
		}

		public string ShowBar() {
			if(_foo == null) {
				throw new InvalidOperationException("FooBar :(");
			}
			return _foo.ShowBar();
		}
	}
}
