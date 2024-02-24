-- Insert dummy data into estate_sticker table
INSERT INTO estate_sticker (id, sticker_name, sticker_style, search_priority)
VALUES ('1c58407e-1b5b-4a91-93b6-ae3e9d30f5d0', 'Featured', 'bg-amber-400', 1);

-- Insert dummy data into sticker_features table for the sticker with id '1c58407e-1b5b-4a91-93b6-ae3e9d30f5d0'
INSERT INTO sticker_features (sticker_id, feature)
VALUES ('1c58407e-1b5b-4a91-93b6-ae3e9d30f5d0', 'Best selling price'),
       ('1c58407e-1b5b-4a91-93b6-ae3e9d30f5d0', 'List your property in top search results'),
       ('1c58407e-1b5b-4a91-93b6-ae3e9d30f5d0', 'Have a higher chance of being contacted by buyers'),
       ('1c58407e-1b5b-4a91-93b6-ae3e9d30f5d0', 'Get more views on your listing'),
       ('1c58407e-1b5b-4a91-93b6-ae3e9d30f5d0', 'Get more enquiries on your listing');
