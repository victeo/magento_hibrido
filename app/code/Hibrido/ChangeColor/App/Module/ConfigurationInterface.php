<?php

namespace Hibrido\ChangeColor\App\Module;

interface ConfigurationInterface
{
    /**
     * Global Config
     */
    public const XML_CONFIG_HEX_COLOR= 'change_color/general/hex_color';

    public const XML_CONFIG_THEME_ID= 'design/theme/theme_id';

    /**
     * Return the XML_CONFIG_HEX_COLOR config value
     *
     * @return string
     */
    public function getHexColor(): string;

    /**
     * Return the XML_CONFIG_THEME_ID config value
     *
     * @return int
     */
    public function getThemeId(): int;
}
