create database CardVentures;

use CardVentures;

create table user (
    usr_id int not null auto_increment,
    usr_name varchar(60) not null,
    usr_pass varchar(200) not null, 
    usr_token varchar(200),
    primary key (usr_id));

create table game (
    gm_id int not null auto_increment,
    gm_turn int not null default 1,
    gm_state_id int not null,
    primary key (gm_id));

create table game_state (
    gst_id int not null auto_increment,
    gst_state varchar(60) not null,
    primary key (gst_id));

create table user_game (
    ug_id int not null auto_increment,
    ug_order int not null,
    ug_user_id int not null,
    ug_game_id int not null,
    ug_state_id int not null,
    ug_hp int not null,
    primary key (ug_id));

create table user_game_state (
    ugst_id int not null auto_increment,
    ugst_state varchar(60) not null,
    primary key (ugst_id));


create table card   (
    crd_id int not null auto_increment,
    crd_name varchar(60) not null,
    crd_hp int not null,
    crd_damage int not null,
    crd_type_id int not null,
    primary key (crd_id));

create table card_type  (
    ct_id int not null auto_increment,
    ct_name varchar(60) not null,
    primary key (ct_id));

create table user_game_card (
    ugc_id int not null auto_increment,
    ugc_user_game_id int not null,
    ugc_crd_id int not null,
    ugc_board_pos int not null,
    primary key (ugc_id));

# Foreign Keys

alter table game add constraint game_fk_game_state
            foreign key (gm_state_id) references game_state(gst_id) 
			ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table user_game add constraint user_game_fk_user
            foreign key (ug_user_id) references user(usr_id) 
			ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table user_game add constraint user_game_fk_game
            foreign key (ug_game_id) references game(gm_id) 
			ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table user_game add constraint user_game_fk_user_game_state
            foreign key (ug_state_id) references user_game_state(ugst_id) 
			ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table card add constraint card_fk_card_type
            foreign key (crd_type_id) references card_type(ct_id)
            ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table user_game_card add constraint user_game_card_fk_user_game
            foreign key (ugc_user_game_id) references user_game(ug_id) 
			ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table user_game_card add constraint user_game_card_fk_user_card
            foreign key (ugc_crd_id) references card(crd_id)
            ON DELETE NO ACTION ON UPDATE NO ACTION;
