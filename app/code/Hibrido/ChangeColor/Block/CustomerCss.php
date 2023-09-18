<?php

namespace Hibrido\ChangeColor\Block;

use Magento\Store\Model\StoreManagerInterface;
use Magento\Framework\Component\ComponentRegistrarInterface;
use Magento\Framework\View\Element\Template;

class CustomerCss extends Template
{
    /** @var StoreManagerInterface */
    protected StoreManagerInterface $storeManager;

    public function __construct(
        StoreManagerInterface $storeManager,
        Template\Context      $context, array $data = [])
    {
        $this->storeManager = $storeManager;
        parent::__construct($context, $data);
    }

    public function getLinkCss(): string
    {
        return $this->getViewFileUrl('Hibrido_ChangeColor::css/' . $this->getStoreId() . '/custom.css');
    }

    public function getStoreId()
    {
        return $this->storeManager->getStore()->getId();
    }
}
