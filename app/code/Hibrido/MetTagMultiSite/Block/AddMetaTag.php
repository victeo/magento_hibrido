<?php

namespace Hibrido\MetTagMultiSite\Block;

use Magento\Cms\Model\Page;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Framework\UrlInterface;
use Magento\Framework\View\Element\Template;
use Magento\Framework\View\Element\Template\Context;
use Magento\Store\Model\StoreManagerInterface;

class AddMetaTag extends Template
{
    /** @var Page */
    protected Page $_page;

    /** @var StoreManagerInterface */
    protected StoreManagerInterface $storeManager;

    /** @var array */
    private array $stores;

    /**
     * @param Context $context
     * @param Page $_page
     * @param StoreManagerInterface $storeManager
     * @param array $data
     */
    public function __construct(
        Template\Context      $context,
        Page                  $_page,
        StoreManagerInterface $storeManager,
        array                 $data = []
    )
    {
        parent::__construct($context, $data);
        $this->_page = $_page;
        $this->storeManager = $storeManager;
        $this->stores = $this->getAllStores();

    }

    public function getInfoPage(): array
    {
        $code = [];
        $cmsStoreIds = $this->_page->getStoreId();

        if (in_array(0, $cmsStoreIds)) {
            $code = $this->stores;
        } else {
            foreach ($cmsStoreIds as $cmsStoreId) {
                $code [] = $this->stores[$cmsStoreId];
            }
        }

        return $code;
    }


    /**
     * Get web url without locale code
     *
     * @return string
     * @throws NoSuchEntityException
     */
    public function getWebUrl($code): string
    {
        return $this->storeManager->getStore()
                ->getBaseUrl(UrlInterface::URL_TYPE_WEB) . $code . '/' . $this->_page->getIdentifier();
    }

    /**
     * Get all Stores views
     *
     * @return array
     */
    private function getAllStores(): array
    {
        $stores = [];
        foreach ($this->storeManager->getStores() as $item) {
            $stores[$item['store_id']] = $item['code'];
        }
        return $stores;
    }

}
