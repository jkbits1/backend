#!/usr/bin/sh

if [[ "X$1" = "X" ]]
then
	echo missing DB name
	echo $0 \<DB name\>
	exit 1
fi

psql $1 < web_role_init.sql

