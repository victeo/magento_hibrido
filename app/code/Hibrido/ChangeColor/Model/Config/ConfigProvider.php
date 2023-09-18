<?php

namespace Hibrido\ChangeColor\Model\Config;

use Magento\Checkout\Model\ConfigProviderInterface;

class ConfigProvider implements ConfigProviderInterface
{
    public function __construct()
    {
    }

    public function getConfig()
    {
        $config = [
            'change'
        ];
        return $config;
    }
}
