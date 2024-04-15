-- @block
USE `my-portfolio`;
-- @block
SELECT *
FROM calendar -- @block 
    -- @block
SELECT email
FROM calendar;
-- 
-- @block
ALTER TABLE calendar
ADD COLUMN time_slot VARCHAR(255),
    ADD COLUMN name VARCHAR(255),
    ADD COLUMN email VARCHAR(255),
    ADD COLUMN phone VARCHAR(255),
    ADD COLUMN comments TEXT;
-- @block
DESCRIBE calendar;