# Mage2 Module Hibrido MetTagMultiSite

    ``hibrido/module-mettagmultisite``

 - [Main Functionalities](#markdown-header-main-functionalities)
 - [Installation](#markdown-header-installation)
 - [Configuration](#markdown-header-configuration)
 - [Specifications](#markdown-header-specifications)
 - [Attributes](#markdown-header-attributes)


## Main Functionalities
Identifies which store views the block is enabled for and adds a meta tag to which ones it is enabled for

## Installation
\* = in production please use the `--keep-generated` option

### Type 1: Zip file

 - Unzip the zip file in `app/code/Hibrido`
 - Enable the module by running `php bin/magento module:enable Hibrido_MetTagMultiSite`
 - Apply database updates by running `php bin/magento setup:upgrade`\*
 - Flush the cache by running `php bin/magento cache:flush`

### Type 2: Composer

 - Make the module available in a composer repository for example:
    - private repository `repo.magento.com`
    - public repository `packagist.org`
    - public github repository as vcs
 - Add the composer repository to the configuration by running `composer config repositories.repo.magento.com composer https://repo.magento.com/`
 - Install the module composer by running `composer require hibrido/module-mettagmultisite`
 - enable the module by running `php bin/magento module:enable Hibrido_MetTagMultiSite`
 - apply database updates by running `php bin/magento setup:upgrade`\*
 - Flush the cache by running `php bin/magento cache:flush`


## Configuration

 - meta_tag_multi_site (meta_tag_multi_site/enable/meta_tag_multi_site)


## Specifications




## Attributes



