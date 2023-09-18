<?php

namespace Hibrido\ChangeColor\Model\Module;

use Hibrido\ChangeColor\App\Module\ConfigurationInterface;
use Hibrido\Core\Model\Config\ModuleConfiguration;

class Configuration extends ModuleConfiguration implements ConfigurationInterface
{

    public function getHexColor(): string
    {
        return $this->getConfiguration(self::XML_CONFIG_HEX_COLOR) ?? 0;
    }

    public function getThemeId(): int
    {
        return $this->getConfiguration(self::XML_CONFIG_THEME_ID);
    }
}
