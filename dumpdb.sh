dropdb -U rahulsurabhi testdb
createdb -U rahulsurabhi testdb
psql -U rahulsurabhi -d testdb -f ./moviedb.sql