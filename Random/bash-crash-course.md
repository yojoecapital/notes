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

### `stat [arg]`

- get time stamps and information for a file

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

- gives you all your user information

### `whoami`

- gives your user name

## Permissions

### `chmod`

- changes the mode of a file
- `chmod +x [arg]` will make file `[arg]` and executable
- `chmod 700 [arg]` will make the permission `rwx --- ---` for file `[arg]`
  - where the first 3 bits  `rwx` are set as `111` or 7
- `chmod 644 [arg]` will make the permission `rw- r-- r--` for file `[arg]`
  - `rw-` are set as `110` or 6
  - `r--` are set as `100` or 4
- `chmod 755 [arg]` will make the permission `rwx r-x r-x` for file `[arg]`
  - `rwx` are set as `111` or 7
  - `r-x` are set as `101` or 5

### Directory Permissions

- using `755` is useful for directories as you need `x` permission to be able to `ls` the directory

## Kill

- use `^C` or `Ctrl + C` to kill a command
- for example use `^C` on `watch free -h`
  - where `watch` executes a command every 2 seconds
  - `free -h` shows the used and free memory in the system (human readable)

### `killall [arg]`

- kills the process named `[arg]` (given that you started that process)
- for example, `killall google-chrome`

### Finding processes

- `ps`

## Get out

- `exit`
- `^D`
  - logs you out
  - you probably should just use `exit`

## Useful things for terminal emulators

- `^L`
  - redraws screen 
  - like `clear`
- `^+`
  - hold shift
  - makes the text bigger
- `^-`
  - don't hold shift
  - makes the text smaller

## String stuff

- `sort`
  - sort lines alphabetically
- `uniq`
  - remove duplicate lines

## Sources

- [Beginner's Guide to the Bash Terminal](https://www.youtube.com/watch?v=oxuRxtrO2Ag)
- [100+ Linux Things you Need to Know](https://www.youtube.com/watch?v=LKCVKw9CzFo)
