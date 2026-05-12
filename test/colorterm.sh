#!/usr/bin/env bash

colors=(
  foreground background
  black brightBlack dimBlack
  white brightWhite dimWhite
  blue brightBlue dimBlue
  cyan brightCyan dimCyan
  green brightGreen dimGreen
  yellow brightYellow dimYellow
  red brightRed dimRed
  magenta brightMagenta dimMagenta
)

codes=(
  "37" "40"
  "30" "90" "2;30"
  "37" "97" "2;37"
  "34" "94" "2;34"
  "36" "96" "2;36"
  "32" "92" "2;32"
  "33" "93" "2;33"
  "31" "91" "2;31"
  "35" "95" "2;35"
)

for i in "${!colors[@]}"; do
  printf '\e[%sm  %-14s  \e[0m\n' \
    "${codes[$i]}" \
    "${colors[$i]}"
done