# Finding Minimal Payment Script

## Requirements

**Python Version**: This script was written using Python 3.11.

## Usage

The script is executed from the command line with several options allowing you to specify input files, output files, and other configurations.

##### Command Line Arguments

- `-i` or `--input`: Specifies the path to the input file containing the item data. Default is `"input.txt"`
- `-p` or `--promotions`: Specifies the path to the promotions file. Default is `"promotions.txt"`
- `-o` or `--output`: Specifies the path where the output file will be written. Default is `"output.txt"`
- `-e` or `--encoding`: Sets the encoding format for all files. Default is `"utf-16"`
- `-v` or `--verbose`: Enables verbose output, which will print the elapsed time and detailed itemization directly to the console
- `-nm` or `--no_memo`: Disables memoization

### Sample Usage

```
python script.py -i simple-input.txt -v -nm
```

