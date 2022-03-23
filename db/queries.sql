SELECT `tag`.`id`,
    `tag`.`tag_name`,
    `product_tag_id`.`id` AS `product_tag_id.id`,
    `product_tag_id`.`product_name` AS `product_tag_id.product_name`,
    `product_tag_id`.`price` AS `product_tag_id.price`,
    `product_tag_id`.`stock` AS `product_tag_id.stock`,
    `product_tag_id`.`category_id` AS `product_tag_id.category_id`,
    `product_tag_id->product_tag`.`id` AS `product_tag_id.product_tag.id`,
    `product_tag_id->product_tag`.`product_id` AS `product_tag_id.product_tag.product_id`,
    `product_tag_id->product_tag`.`tag_id` AS `product_tag_id.product_tag.tag_id`
FROM `tag` AS `tag`
    LEFT OUTER JOIN (
        `product_tag` AS `product_tag_id->product_tag`
        INNER JOIN `product` AS `product_tag_id` ON `product_tag_id`.`id` = `product_tag_id->product_tag`.`product_id`
    ) ON `tag`.`id` = `product_tag_id->product_tag`.`tag_id`;