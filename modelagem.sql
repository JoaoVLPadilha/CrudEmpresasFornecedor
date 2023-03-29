-- ************************************** `EMPRESA`

CREATE TABLE `EMPRESA`
(
 `ID_EMPRESA`   integer NOT NULL AUTO_INCREMENT ,
 `CNPJ`         varchar(14) NOT NULL ,
 `RAZAO_SOCIAL` varchar(100) NOT NULL ,
 `CEP`          varchar(8) NOT NULL ,

PRIMARY KEY (`ID_EMPRESA`)
);


-- ************************************** `FORNECEDOR`

CREATE TABLE `FORNECEDOR`
(
 `ID_FORNECEDOR` integer NOT NULL AUTO_INCREMENT ,
 `CNPJ`          varchar(14) NULL ,
 `CPF`           varchar(11) NULL ,
 `NOME`          varchar(50) NOT NULL ,
 `EMAIL`         varchar(100) NOT NULL ,
 `CEP`           varchar(8) NOT NULL ,

PRIMARY KEY (`ID_FORNECEDOR`)
);


-- ************************************** `CONTRATO`

CREATE TABLE `CONTRATO`
(
 `ID_CONTRATO`   integer NOT NULL AUTO_INCREMENT ,
 `ID_EMPRESA`    integer NOT NULL ,
 `ID_FORNECEDOR` integer NOT NULL ,

PRIMARY KEY (`ID_CONTRATO`),
KEY `FK_2` (`ID_EMPRESA`),
CONSTRAINT `FK_1` FOREIGN KEY `FK_2` (`ID_EMPRESA`) REFERENCES `EMPRESA` (`ID_EMPRESA`),
KEY `FK_3` (`ID_FORNECEDOR`),
CONSTRAINT `FK_2` FOREIGN KEY `FK_3` (`ID_FORNECEDOR`) REFERENCES `FORNECEDOR` (`ID_FORNECEDOR`)
);

