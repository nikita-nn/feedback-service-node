FROM ubuntu:latest
LABEL authors="nikitaarkhipov"

ENTRYPOINT ["top", "-b"]