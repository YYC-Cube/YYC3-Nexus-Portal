"use client"

import { useI18n } from "@/components/i18n-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Command, GripVertical, MessageSquare, Sliders } from "lucide-react";
import { useCallback, useState } from "react";
import { ChatPanel, CommandsPanel, FloatingButton, PanelHeader, PromptsPanel, SettingsPanel } from "./components";
import { type SystemCommand } from "./constants";
import { useAIConfig, useChat, useDraggable, useFloatingPanel } from "./hooks";
import type { AIAssistantProps, AITab } from "./types";

const DRAGGABLE_BOUNDS = {
  left: 20,
  top: 60,
  right: typeof window !== "undefined" ? window.innerWidth - 20 : 1920,
  bottom: typeof window !== "undefined" ? window.innerHeight - 20 : 1080,
};

export function AIAssistant({ isMobile = false }: AIAssistantProps) {
  const { t, locale, setLocale, supportedLocales, localeLabels } = useI18n();
  const { isOpen, isMaximized, activeTab, openPanel, closePanel, toggleMaximize, setActiveTab, panelClass } =
    useFloatingPanel({ isMobile });

  const { position, isDragging, handleMouseDown, handleTouchStart, draggableRef, resetPosition } = useDraggable({
    initialPosition: { x: typeof window !== "undefined" ? window.innerWidth - 420 : 1500, y: 80 },
    bounds: DRAGGABLE_BOUNDS,
  });

  const { messages, inputValue, isTyping, systemPrompt, chatEndRef, sendMessage, setInputValue, clearChat, setSystemPrompt, applyPreset, copyToClipboard, copiedId } = useChat();

  const { apiKey, setApiKey, selectedModel, setSelectedModel, temperature, setTemperature, topP, setTopP, maxTokens, setMaxTokens, availableModels, ollamaLoading, ollamaUrl, setOllamaUrl, rescanModels, addModel, removeModel } = useAIConfig();

  const [showApiKey, setShowApiKey] = useState(false);
  const [cmdFilter, setCmdFilter] = useState<string>("all");

  const executeCommand = (cmd: SystemCommand) => {
    setActiveTab("chat");
    sendMessage(cmd.action);
  };

  const handleSend = () => sendMessage(inputValue);
  const handleClose = useCallback(() => { resetPosition(); closePanel(); }, [resetPosition, closePanel]);

  const currentModel = availableModels.find((m) => m.id === selectedModel);

  if (!isOpen) {
    return <FloatingButton onClick={openPanel} isMobile={isMobile} t={t} />;
  }

  const panelStyle = isMaximized
    ? {}
    : {
      position: "fixed" as const,
      left: position.x,
      top: position.y,
      zIndex: 1000,
      cursor: isDragging ? "grabbing" : "default",
    };

  return (
    <div
      ref={draggableRef}
      className={isMaximized ? panelClass : "w-[380px] h-[520px]"}
      style={panelStyle}
    >
      <div className="w-full h-full rounded-2xl bg-black/95 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/40 flex flex-col overflow-hidden">
        {!isMaximized && (
          <div
            className="shrink-0 h-6 flex items-center justify-center cursor-grab active:cursor-grabbing bg-white/5 border-b border-white/10"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <GripVertical className="w-4 h-4 text-white/30" />
          </div>
        )}

        <PanelHeader
          modelName={currentModel?.name ?? ""}
          isLoading={ollamaLoading}
          isMaximized={isMaximized}
          isMobile={isMobile}
          onClearChat={clearChat}
          onToggleMaximize={toggleMaximize}
          onClose={handleClose}
          t={t}
          locale={locale}
          setLocale={setLocale}
          supportedLocales={supportedLocales}
          localeLabels={localeLabels}
        />

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as AITab)} className="flex-1 flex flex-col min-h-0">
          <div className="shrink-0 px-3 py-2 border-b border-white/10 bg-white/[0.02]">
            <TabsList className="bg-transparent gap-0.5">
              <TabsTrigger value="chat" className="flex items-center gap-1.5 text-xs">
                <MessageSquare className="w-3.5 h-3.5" />
                {t("ai.tabs.chat")}
              </TabsTrigger>
              <TabsTrigger value="commands" className="flex items-center gap-1.5 text-xs">
                <Command className="w-3.5 h-3.5" />
                {t("ai.tabs.commands")}
              </TabsTrigger>
              <TabsTrigger value="prompts" className="flex items-center gap-1.5 text-xs">
                <BookOpen className="w-3.5 h-3.5" />
                {t("ai.tabs.prompts")}
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-1.5 text-xs">
                <Sliders className="w-3.5 h-3.5" />
                {t("ai.tabs.settings")}
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30">
            <TabsContent value="chat" className="flex flex-col h-full m-0 data-[state=inactive]:hidden overflow-hidden">
              <ChatPanel
                messages={messages}
                inputValue={inputValue}
                isTyping={isTyping}
                copiedId={copiedId}
                chatEndRef={chatEndRef}
                onInputChange={setInputValue}
                onSend={handleSend}
                onCopy={copyToClipboard}
                t={t}
              />
            </TabsContent>

            <TabsContent value="commands" className="m-0 data-[state=inactive]:hidden p-3 overflow-hidden">
              <CommandsPanel
                filter={cmdFilter}
                onFilterChange={setCmdFilter}
                onExecute={executeCommand}
                t={t}
              />
            </TabsContent>

            <TabsContent value="prompts" className="m-0 data-[state=inactive]:hidden p-3 overflow-hidden">
              <PromptsPanel
                activePrompt={systemPrompt}
                onSelect={applyPreset}
                onCustomChange={setSystemPrompt}
                t={t}
              />
            </TabsContent>

            <TabsContent value="settings" className="m-0 data-[state=inactive]:hidden p-3 overflow-hidden">
              <SettingsPanel
                apiKey={apiKey}
                showApiKey={showApiKey}
                onToggleApiKey={() => setShowApiKey(!showApiKey)}
                onApiKeyChange={setApiKey}
                models={availableModels}
                selectedModel={selectedModel}
                modelsLoading={ollamaLoading}
                onModelSelect={setSelectedModel}
                ollamaUrl={ollamaUrl}
                onRescan={rescanModels}
                onAddModel={addModel}
                onRemoveModel={removeModel}
                onOllamaUrlChange={setOllamaUrl}
                temperature={temperature}
                onTemperatureChange={setTemperature}
                topP={topP}
                onTopPChange={setTopP}
                maxTokens={maxTokens}
                onMaxTokensChange={setMaxTokens}
                t={t}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
