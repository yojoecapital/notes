# Bash Crash Course

## Essentials

### `ls [arg]` 

- list storage
- `-a` list everything (including hidden `.` files)
- `-l` long list with file info
- `-r` recurse

#### Reading long lists `-l`

- the rightmost output is file permissions. Each group of 3 characters represent:
  1. the current user's permissions
  2. the user's group's permissions
  3. public permissions
- `r` is read
- `w` is write
- `x` is execute
- `-` means that that particular permission is not set

### `pwd` 

- prints the working directory

### `cd [arg]`

- change directory
- without any arguments, it goes to `~`

### `pushd` & `popd`

- `pushd [arg]`
  - change directories but remember the one where in previously
- `popd`
  - go back to the previous directory
- you can use `cd -` in Z shell

### `file [arg]` 

- gives you the file type

### `where [arg]`

- tells you where a command called `[arg]` is installed

### `history`

- gives you your command line history

## Getting Help

### `whatis [arg]`

- tells you a command called `[arg]` does in brief

### `info [arg]`

- tells you information about a command called `[arg]`

### `man [arg]`

- shows you the manual page for a command called `[arg]`

##  File and Directories

### `mkdir [arg]`

- makes a directory

### `touch [arg]`

- updates a file's time stamp if it exists or creates it

### `cp [src] [dest]`

- copy a file

### `mv [src] [dest]`

- move (or rename) a file

### `rm [arg]`

- remove a file

### `rmdir`

- remove an empty directory

## Displaying Content

### `cat [arg]`

- output the content of a file
- it also concatenates outputs for multiple file arguments
- this is a cool trick to put some text input into a file:
  - `cat >> file`
  - press `Ctrl + D` when you're done with input

### `more [arg]`

- pages through content file

### `less [arg]`

- "less is more" 😉

## Redirecting Output

### `[cmd] > [file]` 

- redirects output from `[cmd]` into a `[file]` (overwriting the file)

### `[cmd] >> [file]`

- this will concatenate to the file

## Piping

### `[cmd1] | [cmd2]`

- take the output from `[cmd1]` and put it into `[cmd2]`

## Users

### `sudo [cmd]`

- "super user do" the `[cmd]`
- using the `-s` flag will cause you to become the super user

###  `su [user]`

- logs in as the user `[user]`

### `users`

- lists in the logged in users

### `id`

- gives you all your user account information

## Permissions

Refer to [long list](#Reading long lists `-l`) for more details.
