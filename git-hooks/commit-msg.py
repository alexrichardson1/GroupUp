#!/usr/bin/python3

import sys
import re
from colorama import Fore, Back, Style


def exit_failure(error_message):
    print(Fore.RED + Style.BRIGHT + "fatal: " + error_message + Style.RESET_ALL)
    print("-------------------------------")
    sys.exit(1)


def follows_convention(first_line):
    # strip trailing space
    first_line = first_line.rstrip()
    # located in the README
    types = ["feat", "fix", "style", "refactor",
             "perf", "test", "docs", "chore", "build", "ci"]
    if all([re.match(type + r"\(\.?[\w-]+(\.[a-zA-Z]+)?\): [A-Z]", first_line) is None for type in types]):
        exit_failure("commit message does not follow convention.")
    if len(first_line) > 50:
        exit_failure("header is longer than 50 characters.")
    if (any([first_line.endswith(punc) for punc in [".", "!", "?", "," "...", ":", ";", "(", ")", "'", "-"]])):
        exit_failure("trailing punctuation.")


def co_authors(last_line):
    # members of drp_06
    authors = {"AR": "Co-authored-by: R, Alex <alex.richardson19@imperial.ac.uk>",
               "AA": "Co-authored-by: Ahmed, Ayoob <ayoob.ahmed1319@imperial.ac.uk>",
               "MH": "Co-authored-by: Hussein, Mazen <mazen.hussein319@imperial.ac.uk>"}
    line = last_line.strip("\n").split(" ")
    print(Fore.GREEN + Style.BRIGHT +
          "Replacing name(s) with co-author(s)" + Style.RESET_ALL)
    for i in range(1, len(line)):
        line[i] = authors[line[i]]
    # return updated authors without "W/"
    return "\n".join(line[1:])


def update_commit_msg(file):
    new_commit_message = []
    with open(file, "r") as fp:
        lines = fp.readlines()
        if not lines:
            exit_failure("empty commit message.")
        follows_convention(lines[0].lstrip())
        for line in lines:
            # remove leading whitespace
            line = line.lstrip()
            line_startswith = line.startswith
            # ignore comments
            if line_startswith("#"):
                continue
            updated_line = line
            # co-author alias
            if line_startswith("W/"):
                updated_line = co_authors(line)
            new_commit_message.append(updated_line)
    return new_commit_message


def write_commit_msg(file, new_commit_message):
    with open(file, "w") as fp:
        fp.writelines(new_commit_message)


def main():
    print("--- Running commit-msg hook ---")
    file = sys.argv[1]
    write_commit_msg(file, update_commit_msg(file))
    print(Fore.GREEN + Style.BRIGHT +
          "Commit-msg hook finished successfully." + Style.RESET_ALL)
    print("-------------------------------")
    sys.exit(0)


if __name__ == "__main__":
    main()
