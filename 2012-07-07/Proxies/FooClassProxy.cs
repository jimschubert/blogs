using System;

namespace Proxies
{
	public class FooClassProxy : Foo
	{
		public FooClassProxy (ILogger logger) : base(logger)
		{
		}

		public override void Write (string msg)
		{
			base.Write (String.Format("Message: {0}\n", msg));
		}
	}
}

