<?php
/**
 * @author   Victor Souza <vic.teodoros@gmail.com>
 */

namespace Hibrido\ChangeColor\Model\ChangeColor;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Store\Model\StoreManagerInterface;
use Magento\Store\Api\StoreRepositoryInterface;
use Magento\Framework\App\Cache\Manager;
use Magento\Framework\View\Asset\Repository as AssetRepository;
use PharIo\Version\Exception;
use Magento\Framework\Component\ComponentRegistrar;
use Magento\Framework\Exception\NoSuchEntityException;

class ChanceCssFile
{
    /** @var ScopeConfigInterface */
    protected ScopeConfigInterface $scopeConfig;

    /** @var StoreManagerInterface */
    protected StoreManagerInterface $storeManager;

    /** @var StoreRepositoryInterface */
    protected StoreRepositoryInterface $storeRepository;

    /** @var Manager */
    protected Manager $cacheManager;

    /** @var AssetRepository */
    private AssetRepository $assetRepository;

    /** @var array */
    public array $message = [];

    /**
     * @param ScopeConfigInterface $scopeConfig
     * @param StoreManagerInterface $storeManager
     * @param Manager $cacheManager
     * @param StoreRepositoryInterface $storeRepository
     * @param AssetRepository $assetRepository
     */
    public function __construct(
        ScopeConfigInterface     $scopeConfig,
        StoreManagerInterface    $storeManager,
        Manager                  $cacheManager,
        StoreRepositoryInterface $storeRepository,
        AssetRepository          $assetRepository

    )
    {
        $this->storeRepository = $storeRepository;
        $this->scopeConfig = $scopeConfig;
        $this->storeManager = $storeManager;
        $this->cacheManager = $cacheManager;
        $this->assetRepository = $assetRepository;
    }

    /**
     * Set a new css file
     *
     * @param $hexColor
     * @param $storeId
     * @return void
     * @throws \Zend_Log_Exception
     */
    public function setHexInCssFile($hexColor, $storeId)
    {
        try {
            $store = $this->storeRepository->getById($storeId);

            // Define the new temporary design
            $this->storeManager->setCurrentStore($store->getCode());

            // Create a temporary CSS style file to define the colour of the buttons
            $cssContent = '.action.primary { background-color: #' . $hexColor . '; }';

            $themePath = $storeId . '/' . 'custom.css';
            $themeFullPath = $this->getViewFileMediaDirectory() . '/' . $themePath;

            if (!file_exists(dirname($themeFullPath))) {
                // The directory doesn't exist, you can create the directory here
                mkdir(dirname($themeFullPath), 0755, true);
            }
            file_put_contents($themeFullPath, $cssContent);

            // Clear the layout cache for the changes to take effect
            $this->cacheManager->clean([\Magento\Framework\App\Cache\Type\Layout::TYPE_IDENTIFIER]);
        } catch (Exception $exception) {
            $this->message [] = $exception->getMessage();
            $this->setMessageLog($exception->getMessage());
        }

    }

    /**
     * Returns the media files directory
     *
     * @return string
     */
    private function getViewFileMediaDirectory()
    {
        $componentRegistrar = new ComponentRegistrar();

        $modulePath = $componentRegistrar->getPath(
            ComponentRegistrar::MODULE,
            'Hibrido_ChangeColor'
        );

        return $modulePath . '/view/frontend/web/css';
    }

    /**
     * checks if the store id exists
     *
     * @param $storeId
     * @return bool
     */
    public function checkIfExistStoreId($storeId): bool
    {
        try {
            // Try getting information about the shop from the ID
            $store = $this->storeRepository->getById($storeId);

            // If there is no exception, the shop exists
            return true;
        } catch (NoSuchEntityException $exception) {
            // If an exception occurs, the shop does not exist
            $this->message [] = $exception->getMessage();
            $this->setMessageLog($exception->getMessage());
            return false;
        }
    }

    /**
     * Checks if a string is a valid hexadecimal color code.
     *
     * @param string $hexCode The hexadecimal code to be checked.
     * @return bool Returns true if it's valid, otherwise false.
     */
    function isHexCodeValid(string $hexCode): bool
    {
        // Use a regular expression to validate the format of the hexadecimal code.
        // A valid format cannot start with "#" followed by 3 or 6 hexadecimal characters.
        // Valid examples: FF0000, F00, 00FF00, etc.
        $isHexCodeValid = preg_match('/^([A-Fa-f0-9]{3}){1,2}$/', $hexCode) === 1;

        if (!$isHexCodeValid) {
            $this->message [] = 'The value entered does not correspond to a valid hex code';
            $this->setMessageLog(__('The value entered does not correspond to a valid hex code'));
        }
        return $isHexCodeValid;
    }

    public function setMessageLog($message, $type = 'Error')
    {
        $writer = new \Zend_Log_Writer_Stream(BP . '/var/log/change_color.log');
        $logger = new \Zend_Log();
        $logger->addWriter($writer);
        $logger->info('-------' . $type . '------');
        $logger->err($message);
    }


}
