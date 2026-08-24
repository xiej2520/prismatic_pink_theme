#!/usr/bin/env bash

printf 'Set `"terminal.integrated.minimumContrastRatio": 1` in VS Code.\n'
printf '\e[39m  %-18s  \e[0m\n' "foreground (default)"
printf '\e[49m  %-18s  \e[0m\n' "background (default)"

print_rows() {
  local -n labels=$1
  local -n codes=$2
  local prefix=${3:-}

  for i in "${!labels[@]}"; do
    printf '\e[%sm  %-18s  \e[0m\n' \
      "${codes[$i]}" \
      "${prefix}${labels[$i]}"
  done
}

print_inline() {
  local -n labels=$1
  local -n codes=$2
  local prefix=${3:-}

  for i in "${!labels[@]}"; do
    printf '\e[%sm  %-18s  \e[0m' \
      "${codes[$i]}" \
      "${prefix}${labels[$i]}"
  done
  printf '\n'
}

colors=(
  black brightBlack dimBlack
  white brightWhite dimWhite
  blue brightBlue dimBlue
  cyan brightCyan dimCyan
  green brightGreen dimGreen
  yellow brightYellow dimYellow
  red brightRed dimRed
  magenta brightMagenta dimMagenta
)

normalCodes=(
  "30" "90" "2;30"
  "37" "97" "2;37"
  "34" "94" "2;34"
  "36" "96" "2;36"
  "32" "92" "2;32"
  "33" "93" "2;33"
  "31" "91" "2;31"
  "35" "95" "2;35"
)

printf '\n  ANSI colors\n'
print_rows colors normalCodes

boldCodes=(
  "1;30" "1;90" "1;2;30"
  "1;37" "1;97" "1;2;37"
  "1;34" "1;94" "1;2;34"
  "1;36" "1;96" "1;2;36"
  "1;32" "1;92" "1;2;32"
  "1;33" "1;93" "1;2;33"
  "1;31" "1;91" "1;2;31"
  "1;35" "1;95" "1;2;35"
)

printf '\n  bold ANSI colors\n'
print_rows colors boldCodes 'bold '

rainbowColors=(red yellow green cyan blue magenta)

inverseCodes=("7;31" "7;33" "7;32" "7;36" "7;34" "7;35")
print_inline rainbowColors inverseCodes 'inverse '

brightInverseCodes=("7;91" "7;93" "7;92" "7;96" "7;94" "7;95")
print_inline rainbowColors brightInverseCodes 'bright inverse '

backgroundCodes=("30;41" "30;43" "30;42" "30;46" "30;44" "30;45")
print_inline rainbowColors backgroundCodes 'background '

truecolorCodes=(
  "38;2;255;0;0" "38;2;255;165;0" "38;2;255;255;0"
  "38;2;0;200;0" "38;2;0;180;255" "38;2;180;0;255"
)
print_inline rainbowColors truecolorCodes 'truecolor '

formatLabels=(italic underline inverse strikethrough)
formatCodes=(3 4 7 9)
printf '\n  text formatting\n'
print_rows formatLabels formatCodes

combinedLabels=("bold italic" "bold underline" "italic underline" "inverse bold")
combinedCodes=("1;3" "1;4" "3;4" "7;1")
print_rows combinedLabels combinedCodes
