#region License
//## The MIT License (MIT) 
//Copyright (c) 2012 James Schubert 

//Permission is hereby granted, free of charge, to any person obtaining a 
//copy of this software and associated documentation files (the 
//"Software"), to deal in the Software without restriction, including 
//without limitation the rights to use, copy, modify, merge, publish, 
//distribute, sublicense, and/or sell copies of the Software, and to 
//permit persons to whom the Software is furnished to do so, subject to 
//the following conditions: 

//The above copyright notice and this permission notice shall be included 
//in all copies or substantial portions of the Software. 

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS 
//OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
//MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
//IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY 
//CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, 
//TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
//SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
#endregion License

using System;
using System.Threading;

namespace SingleInstance
{
    class Program
    {
        const string Id = "af49d266-e4f4-4a63-b73c-f62c1144b584";
        static void Main(string[] args)
        {
            bool thisInstance;
            using (var semaphore = new Semaphore(0, 1, Id, out thisInstance))
            {
                if (thisInstance)
                {
                    Console.WriteLine("This is the first instance!");
                    Console.ReadLine();

                    // Release resource
                    semaphore.Release();
                }
                else
                {
                    Console.WriteLine("There is another instance running.");

                    // Wait for resource
                    semaphore.WaitOne();
                    Console.WriteLine("There is now the only instance.");
                    Console.ReadLine();
                }
            }
        }
    }
}
