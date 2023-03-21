# Do not change the order or names of states 
#(the code is assuming specific IDs and names)
# You can add more in the end
insert into game_state (gst_state) values ('Waiting');
insert into game_state (gst_state) values ('Placing');
insert into game_state (gst_state) values ('Finished');

insert into user_game_state (ugst_state) values ('Waiting');
insert into user_game_state (ugst_state) values ('Playing');
insert into user_game_state (ugst_state) values ('End');

insert into card_type (ct_name) values ("Monster");
insert into card_type (ct_name) values ("Spell");
insert into card_type (ct_name) values ("Building");

insert into card (crd_name, crd_hp, crd_damage, crd_type_id) values
	("Monster", 50, 50, 1),
    ("Monster2", 70, 30, 1);

INSERT INTO user (usr_name, usr_pass, usr_token) VALUES ('me','123','48MnTVJ6sKIvanVHbP5Vx5rysbYrVN4EbYmk4D8xESdfm1hx8jDfNFZGNw9OZs'),
						('me2','456','dQ7NrsbPsuF81xFGNioR1K0tiYkjtxOhemcgMhuFIS68VrFUC9gggm3JCgzkqe');
INSERT INTO game VALUES (1,1,2),
						(2,2,1);
INSERT INTO user_game (ug_order, ug_user_id, ug_game_id, ug_state_id, ug_hp) VALUES (1,1,1,1,300),(2,1,2,1,300);

INSERT INTO user_game_card (ugc_user_game_id, ugc_crd_id, ugc_board_pos) VALUES (1,1,0),(1,2,0);



