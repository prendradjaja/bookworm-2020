#!/usr/bin/env sh
set -ex

alias runsql="psql bookworm <"

runsql ./migrations/010--create-tables-book-and-readingentry.sql
