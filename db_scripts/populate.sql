# Do not change the order or names of states 
#(the code is assuming specific IDs and names)
# You can add more in the end
insert into game_state (gst_state) values ('Waiting');
insert into game_state (gst_state) values ('Placing');
insert into game_state (gst_state) values ('Finished');

# Do not change the order, but you can add more in the end
insert into user_game_state (ugst_state) values ('Waiting');
insert into user_game_state (ugst_state) values ('Playing');
insert into user_game_state (ugst_state) values ('End');

insert into card_type (ct_name) values ("Monster");
insert into card_type (ct_name) values ("Building");
insert into card_type (ct_name) values ("Spell");

insert into card (crd_name, crd_hp, crd_damage, crd_type_id) values ("Corn Archer", 50, 50, 1),("Tomato Guy", 70, 30, 1), ("Building",50,0,2),("Spell",0,50,3), ("Macho Pig", 80, 20, 1);

INSERT INTO user VALUES (1,'me','$2b$10$Wemfac2wY/7RSCdKxuYUL.GV2clfhXC66OL76uCpDFUmpYZ/bGZtW','48MnTVJ6sKIvanVHbP5Vx5rysbYrVN4EbYmk4D8xESdfm1hx8jDfNFZGNw9OZs'),(2,'me2','$2b$10$6j2xIDnnxv.TLfBSstbbO.qE7wFTf5envx/uijiFjCP3slsy7EE4K','dQ7NrsbPsuF81xFGNioR1K0tiYkjtxOhemcgMhuFIS68VrFUC9gggm3JCgzkqe');
INSERT INTO game VALUES (1,1,2);

INSERT INTO user_game VALUES (1,1,1,1,2,300),(2,2,2,1,1,300);

INSERT INTO user_game_card (ugc_user_game_id, ugc_crd_id, ugc_board_pos,ugc_crd_hp,ugc_crd_damage,ugc_active, ugc_crd_type) VALUES (1,5,0, 80, 20,1,1), (1,1,0, 50, 50,1,1),(1,2,0, 70, 30,1,1),(1,3,0, 50, 0,1,2), (1,4,0, 0, 50,1,3), (2,1,0, 50, 50,1,1),(2,2,0, 70, 30,1,1),(2,1,0, 50, 50,1,1),(2,3,0, 50, 0,1,2), (2,4,0, 0, 50,1,3);