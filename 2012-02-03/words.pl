#!/usr/bin/env perl
# words.pl: Find all possible slogan words from a single sentence. 
use strict; $|++;

@ARGV >= 2 or die "usage: $0 input_file output_file 'sentence'\n";
my ($infile, $outfile, $sentence) = @ARGV;
$sentence = $sentence || 'how much wood could a woodchuck chuck';

open INPUT, "< $infile" or die $!;
open OUTPUT, "> $outfile" or die $!;

my $stdout = select STDOUT;
$| = 1;
select $stdout;

my %sentence_letters;
my $stmp = $sentence;
$sentence_letters{$&}++ while($stmp =~ s/[a-z]//);

print "Using the sentence '$sentence'\n";
print "Found the following letters:\n";
print "\t$_ - ". $sentence_letters{$_} ."\n" foreach(sort(keys %sentence_letters));
print "Processing $infile for slogan words\n";

my $count = 0;
my @indicators = qw{\ / | .};
LINE: while(<INPUT>) {
    my $word = $_;
    my $tmp = $word;
    next LINE if($word =~ /['\&\d]/);
    my %word_letters;
    $word_letters{$&}++ while($tmp =~ s/[a-z]//);
    
    foreach(keys %word_letters) {
        next LINE if ($word_letters{$_} > $sentence_letters{$_});
    }
    print OUTPUT $word;

    my $word_len = length($word);
    open WORD_LEN_OUTPUT, ">> $outfile.$word_len";
    print WORD_LEN_OUTPUT $word;

    print $indicators[++$count % 4], "\r";
}

print "\nDone.\nView $outfile.* for words\n";
