module Notes
  class AudioRecordingsController < ApplicationController
    def create
      @note = current_user.notes.find(params[:note_id])
      transcription_service = TranscriptionService.new(params[:file])
      transcription_service.call
      transcription_service.results
    end
  end
end