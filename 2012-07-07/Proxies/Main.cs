using System;
using Castle.DynamicProxy;
using System.Diagnostics;

namespace Proxies
{
	class MainClass
	{
		public static void Main (string[] args)
		{
			// Add Console.Out as a listener for Debug.WriteLine to show in Mono
			Debug.Listeners.Add( new ConsoleTraceListener(useErrorStream: false) );

			// Using dependency injection to specify output stream
			// i.e. Foo proxies ILogger
			ILogger logger = new Logger (Console.Out);
			Foo foo = new Foo (logger);
			foo.Write ("Testing Foo\n");

			Console.WriteLine("Hard-coded proxy object demonstrating trace logging:");
			// You could create a second foo type which appears to be IFoo
			// but actually traces method enter/exit by proxy
			IFoo foo2 = new FooInterfaceProxy (logger);
			foo2.Write ("Testing FooInterfaceProxy #1");
			foo2.Write ("Testing FooInterfaceProxy #2");
			
			Console.WriteLine("Hard-coded proxy object demonstrating added functionality:");
			IFoo foo3 = new FooClassProxy(logger);
			foo3.Write("Testing FooClassProxy");
			
			Console.WriteLine("Dynamically proxy an existing object's virtual members (any object works):");
			var proxify = new ProxyGenerator();
			var interceptors = new IInterceptor[] { new DebugLogger() };
			Foo foo4 = proxify.CreateClassProxyWithTarget(foo, interceptors);
			foo4.Write("Class Foo proxied dynamically using CreateClassProxyWithTarget");
			Console.WriteLine("Calling Class Foo's ToString(): {0}", foo4.ToString());
			Console.WriteLine("Calling IFoo.ShowBar(): {0}", foo4.ShowBar());
			Console.WriteLine("Calling Foo.ShowBaz(): {0}\n", foo4.ShowBaz());

			Console.WriteLine ("Dynamic Proxy a specific target:");
			IFoo foo5 = (IFoo)proxify.CreateInterfaceProxyWithTarget(typeof(IFoo), foo, interceptors);
			foo5.Write("Class Foo proxied dynamically using CreateInterfaceProxyWithTarget");
			Console.WriteLine("Calling Class Foo's ToString(): {0}\n", foo5.ToString());
			Console.WriteLine("Calling IFoo.ShowBar(): {0}", foo5.ShowBar());
			Console.WriteLine("Notice the order of interception above.");
		}

		public class DebugLogger : IInterceptor
		{
			#region IInterceptor implementation
			public void Intercept (IInvocation invocation)
			{
				Debug.WriteLine("Debug: proxy enter.");
				invocation.Proceed();
				Debug.WriteLine("Debug: proxy exit.");
			}
			#endregion
		}
	}
}
