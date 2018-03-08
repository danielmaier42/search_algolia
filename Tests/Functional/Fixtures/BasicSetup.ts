
plugin {
    tx_searchcore {
        settings {

            indexing {
                tt_content {
                    indexName = tt_content_test
                    indexer = Codappix\SearchCore\Domain\Index\TcaIndexer

                    dataProcessing {
                        1 = Mahu\SearchAlgolia\DataProcessing\RelationProcessor
                        1 {
                            tableName = tt_content
                            relationLabelField {
                                categories = title
                            }
                        }

                        2 = Mahu\SearchAlgolia\DataProcessing\TypolinkProcessor
                        2 {
                            domainModel = Test
                            plugin = tx_mytest_pi1
                            controller = mytest
                            action = detail
                            detailPid = 11
                        }

                        3 = Codappix\SearchCore\DataProcessing\ContentObjectDataProcessorAdapterProcessor
                        3 {
                            _table = tt_content
                            _dataProcessor = TYPO3\CMS\Frontend\DataProcessing\FilesProcessor

                            references.fieldName = media
                            as = images
                        }

                        4 = Mahu\SearchAlgolia\DataProcessing\FalProcessor
                        4 {
                            fieldName = images
                        }
                    }

                    additionalWhereClause(
                        tt_content.CType NOT IN ('gridelements_pi1', 'list', 'div', 'menu', 'shortcut', 'search', 'login')
                        AND tt_content.bodytext != ''
                    )


                }

                pages {
                    indexName = pages_test
                    indexer = Codappix\SearchCore\Domain\Index\TcaIndexer\PagesIndexer
                    abstractFields = abstract, description, bodytext


                }
            }

            searching {
                facets {
                    contentTypes {
                        field = CType
                    }
                }
            }
        }
    }
}

module.tx_searchcore < plugin.tx_searchcore


page = PAGE
page.100 = <styles.content.get
