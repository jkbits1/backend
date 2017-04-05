#!/usr/bin/sh

if [[ "X$1" = "X" ]]
then
	echo missing DB name
	echo $0 \<DB name\>
	exit 1
fi

createdb $1 \
&& psql $1 < carpool_roles.sql \
&& psql $1 < carpool_schema.sql \
&& pg_restore -d $1 -a carpool_static_data.dat 

