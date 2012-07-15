using System;
using ServiceStack.WebHost.Endpoints.Formats;
using ServiceStack.WebHost.Endpoints.Support.Markdown;
using System.Reflection;
using System.IO;
using System.Collections.Generic;

namespace RazorExample
{
	class MainClass
	{
		// Stub some example objects
		static List<Example> examples = new List<Example>() {
			new Example { Name="Phil", Number=1 },
			new Example { Name="Frank", Number=2 },
			new Example { Name="Sally", Number=3 },
			new Example { Name="Ralph", Number=4 },
			new Example { Name="Ginny", Number=5 },
			new Example { Name="Gomer", Number=6 },
			new Example { Name="Alicia", Number=7 },
		};

		public static void Main (string[] args)
		{
			// Get executing path and /example.md full path
			string exeLocation = Assembly.GetExecutingAssembly().Location;
			string path = Path.GetDirectoryName( exeLocation );
			string template = Path.Combine(path, "example.md");

			// Create the markdown-razor template compiler
			MarkdownFormat format = new MarkdownFormat();
			string contents = File.ReadAllText(template);
			var page = new MarkdownPage(format, path, "example", contents );
			format.AddPage(page);

			// Create our view container (ViewBag)
			var view = new Dictionary<string, object>() 
			{
				{ "examples", examples }
			};

			// Compile and output. 
			// This can be redirected to html file 
			// e.g. RazorExample.exe > output.html
			var html = format.RenderDynamicPageHtml("example", view);
			Console.WriteLine(html);
		}
	}

	class Example {
		public string Name;
		public int Number;
	}
}
