<?php
/**
 * Copyright ©  All rights reserved.
 * See COPYING.txt for license details.
 */
declare(strict_types=1);

namespace Hibrido\ChangeColor\Console\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use \Hibrido\ChangeColor\Model\ChangeColor\ChanceCssFile;
use Magento\Framework\App\Area;
use Magento\Framework\App\State;
use Zend_Log_Exception;

class ChangeColor extends Command
{
    const HEX_COLOR = "hex_color";

    const STORE_ID = "store_id";

    const NAME_OPTION = "option";

    /** @var ChanceCssFile */
    protected ChanceCssFile $chanceCssFile;

    /** @var State */
    protected State $state;


    public function __construct(
        ChanceCssFile $chanceCssFile,
        State         $state,
        string        $name = null)
    {
        parent::__construct($name);
        $this->chanceCssFile = $chanceCssFile;
        $this->state = $state;
    }

    /**
     * {@inheritdoc}
     * @throws Zend_Log_Exception
     */
    protected function execute(
        InputInterface  $input,
        OutputInterface $output
    ): int
    {
        $storeId = $input->getArgument(self::STORE_ID);
        $hexColor = $input->getArgument(self::HEX_COLOR);
        $this->state->setAreaCode(Area::AREA_FRONTEND);

        if ($this->chanceCssFile->checkIfExistStoreId($storeId) && $this->chanceCssFile->isHexCodeValid($hexColor)) {
            // Create the css file with the colours according to the store Id.
            // Two parameters are required, hexCode and store_id
            $this->chanceCssFile->setHexInCssFile($hexColor, $storeId);
        } else {
            // Returns the reason for the error
            $output->writeln(implode(',', $this->chanceCssFile->message));
        }
        return \Magento\Framework\Console\Cli::RETURN_SUCCESS;
    }

    /**
     * {@inheritdoc}
     */
    protected function configure()
    {
        $this->setName("hibrido_changecolor:changecolor");
        $this->setDescription("A Magento console command, which receives a HEX colour and the ID of a store-view as parameters, changing the colour of the thema");
        $this->setDefinition([
            new InputArgument(self::HEX_COLOR, InputArgument::REQUIRED, "hex_color"),
            new InputArgument(self::STORE_ID, InputArgument::REQUIRED, "Store_id"),
            new InputOption(self::NAME_OPTION, "-a", InputOption::VALUE_NONE, "Option functionality")
        ]);
        parent::configure();
    }

}

