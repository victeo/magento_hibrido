<?php
/**
 * @author   Victor Souza <vic.teodoros@gmail.com>
 */
namespace Hibrido\Core\Model\Config;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Store\Model\ScopeInterface;
use Magento\Store\Model\StoreManagerInterface;

class ConfigConfiguration
{
    /**
     * ScopeConfigInterface
     *
     * @var ScopeConfigInterface
     */
    private ScopeConfigInterface $scopeConfig;

    /**
     * StoreManagerInterface
     *
     * @var StoreManagerInterface
     */
    private StoreManagerInterface $storeManager;

    /**
     * @param ScopeConfigInterface $scopeConfig
     * @param StoreManagerInterface $storeManager
     */
    public function __construct(
        ScopeConfigInterface  $scopeConfig,
        StoreManagerInterface $storeManager
    )
    {
        $this->scopeConfig = $scopeConfig;
        $this->storeManager = $storeManager;
    }

    /**
     * ScopeConfigInterface Getter
     *
     * @return ScopeConfigInterface
     */
    public function getScopeConfig(): ScopeConfigInterface
    {
        return $this->scopeConfig;
    }

    /**
     * StoreManagerInterface Getter
     *
     * @return StoreManagerInterface
     */
    public function getStoreManage(): StoreManagerInterface
    {
        return $this->storeManager;
    }

    /**
     * Get Configuration
     *
     * @param string $path Path
     * @param string $scope Scope
     * @param mixed $entityId EntityId
     *
     * @return mixed
     */
    public function getConfiguration(string $path, $entityId = null, string $scope = null)
    {
        return $this->scopeConfig->getValue(
            $path,
            $scope ?? ScopeInterface::SCOPE_STORE,
            $entityId ?? $this->getStoreId()
        );
    }

    /**
     * Returns the storeID
     *
     * @return int|null
     */
    public function getStoreId(): ?int
    {
        try {
            return (int)$this->storeManager->getStore()->getId();
        } catch (NoSuchEntityException $e) {
            return null;
        }
    }
}

