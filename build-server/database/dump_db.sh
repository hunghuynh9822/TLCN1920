#!/bin/bash

pg_dump -h localhost -U postgres -p 5432 -v postgres > database/TLCN.sql
