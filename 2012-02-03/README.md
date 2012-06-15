Accompanies my [blog post](http://www.ipreferjim.com/2012/02/words-pl-slogan-word-generator/).

To run:

    perl words.pl /usr/share/dict/words generated.txt 'Good goly, Miss Molly'

Output will resemble:

    jim at schubert in ~/projects/gist-1733871 on master*
    $ tree .
    .
    ├── generated.txt
    ├── generated.txt.1
    ├── generated.txt.2
    ├── generated.txt.3
    ├── generated.txt.4
    ├── generated.txt.5
    ├── generated.txt.6
    ├── generated.txt.7
    ├── generated.txt.8
    └── words.pl
     
    0 directories, 10 files

Where generated.txt.3 *should* contain all 3-letter words.  If the input file has `\r\n` instead of `\n`, the counts might be off by one.


